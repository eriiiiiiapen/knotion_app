class Task < ApplicationRecord
  belongs_to :company
  belongs_to :user
  belongs_to :knowledge_article, optional: true

  enum :status, { todo: 0, doing: 1, done: 2 }

  validates :title, presence: true
end
