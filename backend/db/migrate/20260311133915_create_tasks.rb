class CreateTasks < ActiveRecord::Migration[8.1]
  def change
    create_table :tasks do |t|
      t.references :company, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.integer :status
      t.date :due_date
      t.text :description

      t.timestamps
    end
  end
end
