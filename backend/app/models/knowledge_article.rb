class KnowledgeArticle < ApplicationRecord
  belongs_to :company
  has_many :tasks

  enum :status, { draft: 0, published: 1 }
  validates :title, presence: true
end
