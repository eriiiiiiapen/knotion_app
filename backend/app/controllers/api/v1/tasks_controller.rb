class Api::V1::TasksController < ApplicationController
    # 開発中のみCSRFチェックスキップ
    skip_before_action :verify_authenticity_token
    # before_action :authenticate_user!

    def create
        user = User.first
        task = user.tasks.build(task_params)
        task.company = user.company

        if task.save
            render json: task, status: :created
        else
            render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def task_params
        params.require(:task).permit(:title, :description, :status, :due_date)
    end
end
