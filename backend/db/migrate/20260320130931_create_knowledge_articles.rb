class CreateKnowledgeArticles < ActiveRecord::Migration[8.1]
  def change
    create_table :knowledge_articles do |t|
      t.references :company, null: false, foreign_key: true
      t.string :title, null: false
      t.text :content
      t.string :category
      t.integer :status, default: 0, null: false

      t.timestamps
    end
  end
end
