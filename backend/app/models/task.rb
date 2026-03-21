class Task < ApplicationRecord
  belongs_to :company
  belongs_to :user
  has_many :knowledge_articles

  enum :status, { todo: 0, doing: 1, done: 2 }

  validates :title, presence: true
end
