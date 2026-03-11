class Company < ApplicationRecord
    has_many :users, dependent: :destroy
    has_many :tasks, dependent: :destroy

    validates :name, presence: true
    validates :subdomain, presence: true, uniqueness: true
end
