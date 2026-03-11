class Api::V1::UsersController < ApplicationController
  def me
    user = User.first

    render json: {
      id: user.id,
      email: user.email,
      company_name: user.company.name,
      tasks: user.tasks.map { |task|
        {
          id: task.id,
          title: task.title,
          status: task.status,
          description: task.description,
          due_date: task.due_date,
        }
      }
    }
  end

  def show
  end
end
