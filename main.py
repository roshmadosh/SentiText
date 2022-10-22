from fastapi import FastAPI, Request, WebSocket
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from analyzer import analyze_text

app = FastAPI()

app.mount('/static', StaticFiles(directory='static'), name='static')
templates = Jinja2Templates(directory='templates')

@app.get('/', response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse('index.html', { "request": request })
    
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