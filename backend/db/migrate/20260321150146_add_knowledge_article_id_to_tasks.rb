class AddKnowledgeArticleIdToTasks < ActiveRecord::Migration[8.1]
  def change
    add_reference :tasks, :knowledge_article, foreign_key: true
  end
end
