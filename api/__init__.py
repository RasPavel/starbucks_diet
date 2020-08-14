from flask import Flask, request
from .diet import Diet, get_optimal_nutrients, get_nutrients, ga_solve


def create_app():
    app = Flask(__name__)
    app.secret_key = 'dev'

    @app.route('/diet', methods=['POST'])
    def get_macros():
        params = request.json
        try:
            weight = int(params.get('weight'))
            height = int(params.get('height'))
            age = int(params.get('age'))
            gender = params.get('gender')
            activity_level = float(params.get('activityLevel'))
        except Exception as e:
            return 'Bad request', 400

        optimal_nutrients = get_optimal_nutrients(weight, height, age, gender, activity_level)
        diet = ga_solve(optimal_nutrients)

        return {
            'optimal': optimal_nutrients.to_dict(),
            'suggested': get_nutrients(diet).mean().to_dict(),
            'diet': diet.aslist()
        }

    return app

