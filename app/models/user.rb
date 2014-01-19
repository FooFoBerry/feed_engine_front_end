class User
  extend ActiveModel::Naming
  include ActiveModel::Conversion
  attr_reader :name, :avatar

  def self.find_by(attributes = {})
    user_data = FooFoBerry.find_user_by_id(attributes[:id])
    new(user_data)
  end

  def initialize(attributes)
    @name = attributes[:name]
    @avatar = attributes[:avatar]
  end
end

class FooFoBerry
  def self.find_user_by_id(id)
    {
      :id => 1,
      :name => "Tyler Long",
      :avatar => "https://2.gravatar.com/avatar/4164b853dcf6cad5fae8af49de2e12b5?s=75"
    }
  end
end
