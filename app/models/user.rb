class User
  extend ActiveModel::Naming
  include ActiveModel::Conversion
  attr_reader :name

  def self.find_by(attributes = {})
    user_data = FooFoBerry.find_user_by_id(attributes[:id])
    new(user_data)
  end

  def initialize(attributes)
    @name = attributes[:name]
  end
end

class FooFoBerry
  def self.find_user_by_id(id)
    {
      :id => 1,
      :name => "Tyler Long"
    }
  end
end
