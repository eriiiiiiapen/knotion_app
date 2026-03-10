class Api::V1::UsersController < ApplicationController
  def me
    user = User.first

    render json: {
      id: user.id,
      email: user.email,
      company_name: user.company.name
    }
  end

  def show
  end
end
