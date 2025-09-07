from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import pandas as pd
import pickle
from fastapi.middleware.cors import CORSMiddleware
import ast  # for safely parsing string to list

app = FastAPI()
origins = [
    "http://localhost:5173",  # React dev server
       # sometimes used
    "http://192.168.1.69:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # or ["*"] for all origins (not recommended for production)
    #allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ================================
# Load data
# ================================
sym_des = pd.read_csv("data/symtoms_df.csv")
precautions = pd.read_csv("data/precautions_df.csv")
workout = pd.read_csv("data/workout_df.csv")
description = pd.read_csv("data/description.csv")
medications = pd.read_csv('data/medications.csv')
diets = pd.read_csv("data/diets.csv")

# ================================
# Load model
# ================================
svc = pickle.load(open('Model/svc.pkl', 'rb'))

# ================================
# Hardcoded dicts (YOUR FULL DICTS)
# ================================
symptoms_dict = {
    'itching': 0, 'skin_rash': 1, 'nodal_skin_eruptions': 2, 'continuous_sneezing': 3,
    'shivering': 4, 'chills': 5, 'joint_pain': 6, 'stomach_pain': 7, 'acidity': 8,
    'ulcers_on_tongue': 9, 'muscle_wasting': 10, 'vomiting': 11, 'burning_micturition': 12,
    'spotting_ urination': 13, 'fatigue': 14, 'weight_gain': 15, 'anxiety': 16,
    'cold_hands_and_feets': 17, 'mood_swings': 18, 'weight_loss': 19, 'restlessness': 20,
    'lethargy': 21, 'patches_in_throat': 22, 'irregular_sugar_level': 23, 'cough': 24,
    'high_fever': 25, 'sunken_eyes': 26, 'breathlessness': 27, 'sweating': 28,
    'dehydration': 29, 'indigestion': 30, 'headache': 31, 'yellowish_skin': 32,
    'dark_urine': 33, 'nausea': 34, 'loss_of_appetite': 35, 'pain_behind_the_eyes': 36,
    'back_pain': 37, 'constipation': 38, 'abdominal_pain': 39, 'diarrhoea': 40,
    'mild_fever': 41, 'yellow_urine': 42, 'yellowing_of_eyes': 43, 'acute_liver_failure': 44,
    'fluid_overload': 45, 'swelling_of_stomach': 46, 'swelled_lymph_nodes': 47,
    'malaise': 48, 'blurred_and_distorted_vision': 49, 'phlegm': 50, 'throat_irritation': 51,
    'redness_of_eyes': 52, 'sinus_pressure': 53, 'runny_nose': 54, 'congestion': 55,
    'chest_pain': 56, 'weakness_in_limbs': 57, 'fast_heart_rate': 58, 'pain_during_bowel_movements': 59,
    'pain_in_anal_region': 60, 'bloody_stool': 61, 'irritation_in_anus': 62, 'neck_pain': 63,
    'dizziness': 64, 'cramps': 65, 'bruising': 66, 'obesity': 67, 'swollen_legs': 68,
    'swollen_blood_vessels': 69, 'puffy_face_and_eyes': 70, 'enlarged_thyroid': 71,
    'brittle_nails': 72, 'swollen_extremeties': 73, 'excessive_hunger': 74,
    'extra_marital_contacts': 75, 'drying_and_tingling_lips': 76, 'slurred_speech': 77,
    'knee_pain': 78, 'hip_joint_pain': 79, 'muscle_weakness': 80, 'stiff_neck': 81,
    'swelling_joints': 82, 'movement_stiffness': 83, 'spinning_movements': 84,
    'loss_of_balance': 85, 'unsteadiness': 86, 'weakness_of_one_body_side': 87,
    'loss_of_smell': 88, 'bladder_discomfort': 89, 'foul_smell_of urine': 90,
    'continuous_feel_of_urine': 91, 'passage_of_gases': 92, 'internal_itching': 93,
    'toxic_look_(typhos)': 94, 'depression': 95, 'irritability': 96, 'muscle_pain': 97,
    'altered_sensorium': 98, 'red_spots_over_body': 99, 'belly_pain': 100,
    'abnormal_menstruation': 101, 'dischromic _patches': 102, 'watering_from_eyes': 103,
    'increased_appetite': 104, 'polyuria': 105, 'family_history': 106, 'mucoid_sputum': 107,
    'rusty_sputum': 108, 'lack_of_concentration': 109, 'visual_disturbances': 110,
    'receiving_blood_transfusion': 111, 'receiving_unsterile_injections': 112,
    'coma': 113, 'stomach_bleeding': 114, 'distention_of_abdomen': 115,
    'history_of_alcohol_consumption': 116, 'fluid_overload.1': 117, 'blood_in_sputum': 118,
    'prominent_veins_on_calf': 119, 'palpitations': 120, 'painful_walking': 121,
    'pus_filled_pimples': 122, 'blackheads': 123, 'scurring': 124, 'skin_peeling': 125,
    'silver_like_dusting': 126, 'small_dents_in_nails': 127, 'inflammatory_nails': 128,
    'blister': 129, 'red_sore_around_nose': 130, 'yellow_crust_ooze': 131
}

diseases_list = {
    15: 'Fungal infection', 4: 'Allergy', 16: 'GERD', 9: 'Chronic cholestasis',
    14: 'Drug Reaction', 33: 'Peptic ulcer diseae', 1: 'AIDS', 12: 'Diabetes ',
    17: 'Gastroenteritis', 6: 'Bronchial Asthma', 23: 'Hypertension ', 30: 'Migraine',
    7: 'Cervical spondylosis', 32: 'Paralysis (brain hemorrhage)', 28: 'Jaundice',
    29: 'Malaria', 8: 'Chicken pox', 11: 'Dengue', 37: 'Typhoid', 40: 'hepatitis A',
    19: 'Hepatitis B', 20: 'Hepatitis C', 21: 'Hepatitis D', 22: 'Hepatitis E',
    3: 'Alcoholic hepatitis', 36: 'Tuberculosis', 10: 'Common Cold', 34: 'Pneumonia',
    13: 'Dimorphic hemmorhoids(piles)', 18: 'Heart attack', 39: 'Varicose veins',
    26: 'Hypothyroidism', 24: 'Hyperthyroidism', 25: 'Hypoglycemia',
    31: 'Osteoarthristis', 5: 'Arthritis', 0: '(vertigo) Paroymsal  Positional Vertigo',
    2: 'Acne', 38: 'Urinary tract infection', 35: 'Psoriasis', 27: 'Impetigo'
}

# ================================
# Pydantic models
# ================================
class SymptomsInput(BaseModel):
    symptoms: list[str]

class DiseaseInput(BaseModel):
    disease_name: str

# ================================
# Helper function
# ================================

# def helper(dis):
#     # Description
#     desc = description[description['Disease'] == dis]['Description']
#     desc = " ".join([w for w in desc]) if not desc.empty else "No description available."

#     # Precautions
#     pre = precautions[precautions['Disease'] == dis][['Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4']]
#     if not pre.empty:
#         # Flatten and remove NaNs
#         pre_list = [str(p) for p in pre.values[0] if str(p) != 'nan']
#     else:
#         pre_list = ["No precautions available."]

#     # Medications
#     med = medications[medications['Disease'] == dis]['Medication']
#     med = [m for m in med.values] if not med.empty else ["No medications available."]

#     # Diets
#     die = diets[diets['Disease'] == dis]['Diet']
#     die = [d for d in die.values] if not die.empty else ["No diet information available."]

#     # Workouts
#     wrkout = workout[workout['disease'] == dis]['workout']
#     wrkout = [w for w in wrkout.values] if not wrkout.empty else ["No workout recommendations available."]

#     return desc, pre_list, med, die, wrkout

#import ast
# def parse_list(value):
#     try:
#         # Try to parse as Python list string
#         return ast.literal_eval(value)
#     except:
#         # If fails, split by comma and strip spaces
#         return [v.strip() for v in value.split(",") if v.strip()]
def parse_list(value):
    if not value or pd.isna(value):
        return []
    try:
        parsed = ast.literal_eval(value)
        if isinstance(parsed, list):
            return parsed
        return [str(parsed)]
    except:
        return [v.strip() for v in str(value).split(",") if v.strip()]
    




def helper(dis):
    # Description
    desc_row = description[description['Disease'] == dis]['Description']
    desc = " ".join(desc_row.values) if not desc_row.empty else "No description available."

    # Medications
    med_row = medications[medications['Disease'] == dis]['Medication']
    med = parse_list(med_row.values[0]) if not med_row.empty else ["No medications available."]

    # Diets
    diet_row = diets[diets['Disease'] == dis]['Diet']
    diet = parse_list(diet_row.values[0]) if not diet_row.empty else ["No diet information available."]

    # Workout
    wrkout_row = workout[workout['disease'] == dis]['workout']
    #wrkout = parse_list[w for w in wrkout_row.values[0]] if not wrkout_row.empty else ["No workout recommendations available."]
    wrkout = parse_list(wrkout_row.values[0]) if not wrkout_row.empty else ["No workout recommendations available."]

    return desc, med, diet, wrkout

# ================================
# Prediction function
# ================================
def get_predicted_value(patient_symptoms):
    input_vector = np.zeros(len(symptoms_dict))
    for item in patient_symptoms:
        key = item.strip().lower().replace(" ", "_")
        if key in symptoms_dict:
            input_vector[symptoms_dict[key]] = 1

    predicted_code = svc.predict([input_vector])[0]
    return diseases_list[predicted_code]

# ================================
# API endpoints
# ================================
@app.post("/predict_by_symptoms")
def predict_by_symptoms(data: SymptomsInput):
    user_symptoms = [s.strip() for s in data.symptoms]
    predicted_disease = get_predicted_value(user_symptoms)
    desc, med, diet, wrkout = helper(predicted_disease)

    return {
        "predicted_disease": predicted_disease,
        "description": desc,
        "medications": med,
        "diets": diet,
        "workout": wrkout
    }

@app.post("/predict_by_disease")
def predict_by_disease(data: DiseaseInput):
    dis_input = data.disease_name.strip().lower().replace(" ", "_").capitalize()

    # Find disease in CSV ignoring case/underscores
    disease_candidates = description['Disease'].unique()
    dis_found = next(
        (d for d in disease_candidates if d.strip().lower().replace(" ", "_") == dis_input.strip().lower()),
        None
    )

    if not dis_found:
        return {"error": f"Disease '{data.disease_name}' not found."}

    desc, med, diet, wrkout = helper(dis_found)

    return {
        "disease": dis_found,
        "description": desc,
        "medications": med,
        "diets": diet,
        "workout": wrkout
    }


# def helper(dis):
#     # Description
#     desc = description[description['Disease'] == dis]['Description']
#     desc = " ".join([w for w in desc]) if not desc.empty else "No description available."

#     # Medications
#     med_row = medications[medications['Disease'] == dis]['Medication']
#     if not med_row.empty:
#         med = ast.literal_eval(med_row.values[0])  # Convert string list to actual list
#     else:
#         med = ["No medications available."]

#     # Diets
#     diet_row = diets[diets['Disease'] == dis]['Diet']
#     if not diet_row.empty:
#         diet = ast.literal_eval(diet_row.values[0])
#     else:
#         diet = ["No diet information available."]

#     # Workout
#     wrkout_row = workout[workout['disease'] == dis]['workout']
#     if not wrkout_row.empty:
#         wrkout = [w for w in wrkout_row.values[0]]
#     else:
#         wrkout = ["No workout recommendations available."]

#     return desc, med, diet, wrkout


# # ================================
# # Prediction function by symptoms
# # ================================
# def get_predicted_value(patient_symptoms):
#     input_vector = np.zeros(len(symptoms_dict))
#     for item in patient_symptoms:
#         key = item.strip().lower().replace(" ", "_")
#         if key in symptoms_dict:
#             input_vector[symptoms_dict[key]] = 1

#     predicted_code = svc.predict([input_vector])[0]
#     return diseases_list[predicted_code]

# # ================================
# # API endpoints
# # ================================
# @app.post("/predict_by_symptoms")
# def predict_by_symptoms(data: SymptomsInput):
#     user_symptoms = [s.strip() for s in data.symptoms]
#     predicted_disease = get_predicted_value(user_symptoms)

#     dis_des, pre, meds, diet, wrkout = helper(predicted_disease)

#     # my_precautions = []
#     # for i in pre[0]:
#     #     my_precautions.append(i)

#     return {
#         "predicted_disease": predicted_disease,
#         "description": dis_des,
#         "precautions": pre,
#         "medications": meds,
#         "diets": diet,
#         "workout": wrkout
#     }

# @app.post("/predict_by_disease")
# def predict_by_disease(data: DiseaseInput):
#     dis = data.disease_name.strip().lower().replace(" ", "_").capitalize()
#     # Because disease names in CSV might be capitalized normally, try to match properly:
#     # Try exact match first; else try capitalized; else return not found message

#     # Attempt to find exact match ignoring case and underscores:
#     disease_candidates = description['Disease'].unique()
#     dis_found = None
#     for d in disease_candidates:
#         if d.strip().lower().replace(" ", "_") == dis.strip().lower():
#             dis_found = d
#             break
        
#     if not dis_found:
#         return {"error": f"Disease '{data.disease_name}' not found."}

#     desc, pre, med, die, wrkout = helper(dis_found)

#     # my_precautions = []
#     # for i in pre[0]:
#     #     my_precautions.append(i)

#     return {
#         "disease": dis_found,
#         "description": desc,
#         "precautions": pre,
#         "medications": med,
#         "diets": die,
#         "workout": wrkout
#     }
