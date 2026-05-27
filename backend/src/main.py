import asyncio
import os

from fastapi import FastAPI
from pydantic import BaseModel
import judge0
from dotenv import load_dotenv

from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()

URL = os.getenv("SITE_URL", "http://localhost:3000")

allowed_origins = [
    URL,  # replace with your specific site
    # you can add more if needed, e.g.
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,        # specific site(s) only
    allow_credentials=False,               # needed if using cookies/auth
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)



class RunCodePayload(BaseModel):
    source_code: str
    language_id: int | None = None
    stdin: str | None = None


MISSING_INPUT_PATTERNS = (
    "eoferror: eof when reading a line",
    "eof when reading a line",
    "no line found",
    "nosuchelementexception",
    "inputmismatchexception",
)


def _needs_stdin(stdin: str | None, stderr: str, message: str) -> bool:
    if stdin is not None and stdin.strip() != "":
        return False

    joined = f"{stderr}\n{message}".lower()
    return any(pattern in joined for pattern in MISSING_INPUT_PATTERNS)


@app.get("/")
async def root():
    client = await asyncio.to_thread(judge0.get_client)
    python_language_id = await asyncio.to_thread(
        client.get_language_id,
        judge0.PYTHON3,
    )
    executed = await asyncio.to_thread(
        judge0.run,
        source_code="print('hello Tiny!')",
        client=client,
        language=python_language_id,
    )
    return {
        "message": "Backend Connected!",
        "code": executed,
        "url": URL,
        "languages": client.languages,
    }


@app.post("/run")
async def run_code(payload: RunCodePayload):
    client = await asyncio.to_thread(judge0.get_client)
    language_id = payload.language_id
    if language_id is None:
        language_id = await asyncio.to_thread(
            client.get_language_id,
            judge0.PYTHON3,
        )

    executed = await asyncio.to_thread(
        judge0.run,
        source_code=payload.source_code,
        stdin=payload.stdin,
        client=client,
        language=language_id,
    )

    stderr = executed.stderr or ""
    message = executed.message or ""
    needs_input = _needs_stdin(payload.stdin, stderr, message)

    return {
        "language_id": language_id,
        "status": str(executed.status) if executed.status else None,
        "stdout": executed.stdout or "",
        "stderr": stderr,
        "compile_output": executed.compile_output or "",
        "message": message,
        "time": executed.time,
        "memory": executed.memory,
        "needs_input": needs_input,
        "input_prompt": (
            "Program requires standard input. Enter stdin and run again."
            if needs_input
            else ""
        ),
    }
