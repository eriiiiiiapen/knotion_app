class AddDetailsToCompanies < ActiveRecord::Migration[8.1]
  def change
    add_column :companies, :subdomain, :string
    add_index :companies, :subdomain
    add_column :companies, :description, :text
  end
end
