import asyncio
import os

from fastapi import FastAPI
from pydantic import BaseModel
import judge0
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

URL = os.getenv("SITE_URL", "http://localhost:3000")


class RunCodePayload(BaseModel):
    source_code: str
    language_id: int | None = None
    stdin: str | None = None


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

    return {
        "language_id": language_id,
        "status": str(executed.status) if executed.status else None,
        "stdout": executed.stdout or "",
        "stderr": executed.stderr or "",
        "compile_output": executed.compile_output or "",
        "message": executed.message or "",
        "time": executed.time,
        "memory": executed.memory,
    }
