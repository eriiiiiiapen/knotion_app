class KnowledgeArticle < ApplicationRecord
  belongs_to :company
  belongs_to :task

  enum :status, { draft: 0, published: 1 }
  validates :title, presence: true
end
