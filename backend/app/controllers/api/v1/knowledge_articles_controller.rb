class Api::V1::KnowledgeArticlesController < ApplicationController
    # 開発中のみCSRFチェックスキップ
    skip_before_action :verify_authenticity_token
    # before_action :authenticate_user!

    def index
        # TODO:仮
        articles = KnowledgeArticle.where(company_id: 1).order(created_at: :desc)
        render json: articles
    end

    def create
        article = KnowledgeArticle.new(article_params)
        article.company_id = 1 # 本来は current_user.company_id

        if article.save
            render json: article, status: :created
        else
            render json: { errors: article.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def article_params
        params.require(:knowledge_article).permit(:title, :content, :status)
    end
end
