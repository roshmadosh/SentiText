from transformers import AutoModelForSequenceClassification
from transformers import AutoTokenizer
import numpy as np
from scipy.special import softmax

# sentiment_pipeline = pipeline("sentiment-analysis")

# def analyze_text(text: str):
#     return sentiment_pipeline(text)

task = 'sentiment'
MODEL = f"cardiffnlp/twitter-roberta-base-{task}"

tokenizer = AutoTokenizer.from_pretrained(MODEL)

#PT
model = AutoModelForSequenceClassification.from_pretrained(MODEL)


def analyze_text(text):
    encoded_input = tokenizer(text, return_tensors='pt')
    output = model(**encoded_input)

    scores = output[0][0].detach().numpy()
    scores = softmax(scores)
    
    return {
        "text": text,
        "scores": scores
    }