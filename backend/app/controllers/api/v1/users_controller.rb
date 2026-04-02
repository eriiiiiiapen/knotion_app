class Api::V1::UsersController < ApplicationController
  def me
    user = User.includes(tasks: :knowledge_article).first

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
          knowledge_article: task.knowledge_article ? {
            id: task.knowledge_article.id,
            title: task.knowledge_article.title
          } : nil
        }
      }
    }
  end

  def show
  end
end
