from fastapi import FastAPI, WebSocket
from analyzer import analyze_text

app = FastAPI()

    
@app.websocket("/test")
async def test(websocket: WebSocket):
    await websocket.accept()
    while True:
        request = await websocket.receive_text()
        result = analyze_text(request)
        serialized = [str(val) for val in result['scores']]
        await websocket.send_json({
            "text": result['text'],
            "NEGATIVE": serialized[0],
            "NEUTRAL": serialized[1],
            "POSITIVE": serialized[2]
        })