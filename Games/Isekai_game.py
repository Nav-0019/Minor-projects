import random as rm

class Isekai:
    def __init__(self, name):
        self.name = name
        self.level = 0
        self.monster = ["Slime", "Goblin", "Orc", "Troll", "Stempede of monster", "Dragon","Demon God"]
        self.position = ["Traveller","Villager","Village hero","Noble","King","SSS rank adventurer","Demi-God"]
        self.weapon = ["Wooden sword","Iron sword","Steel sword","Mithril sword","Excalibur","Soul sword","Sword of light"]
        
    def hit(self):
        if self.level < len(self.monster) - 1:
            print(f"{self.name} has killed the {self.monster[self.level]}!")
            self.level += 1
            print(f"{self.name} has leveled up!")
            print(f"{self.name} is now a {self.position[self.level]} with a {self.weapon[self.level]}.")
        else:
            print(f"{self.name} has defeated the final boss and saved the world!")
    
def Isekai_Game():
    player1 = Isekai(input("1. Create a character : "))
    exit_game = False
    while True:
        print(f"Welcome to isekai! You are {player1.name} with level {player1.level}.")
        print(f"{player1.name} is a {player1.position[player1.level]} with a {player1.weapon[player1.level]}.")
        
        while True:
            if player1.level >= len(player1.monster) - 1:
                print(f"{player1.name} have defeated the final boss and saved the world!")
                exit_game = True
                break
            else:
                print(f"\nAttention! {player1.monster[player1.level]} is infront of you!")
                print("What do you want to do?")
                print("0. Check Status")
                print("1. Hit")
                print("2. Run")
                print("3. Exit")

                choice = input("Enter your choice: ")

                if choice == "0":
                    print(f'''
                            Name : {player1.name}
                            Occupation : {player1.position[player1.level]}
                            Sword rank : {player1.weapon[player1.level]}
                            Level : {player1.level}\n 
                        ''')
                elif choice == "1":
                    count = 0
                    while True:
                        monster_attack = rm.randint(0,2**player1.level)
                        try:
                            try_attack = int(input(f"\nEnter your attack number to correctly hit him in between 0 and {2**player1.level}: "))
                        except ValueError:
                            print("Please enter a valid number.")
                            continue
                                    
                        if try_attack == monster_attack:
                            player1.hit()
                            break
                        else:
                            print("Monster dodged the sword attack!\n==The monster attacked you back and you got a critical hit!==")
                            count += 1
                            if player1.level > 1 and count > 2**(player1.level)*0.75:
                                print("Oops! Ultimate attack by the monster! you couldn't evade.")
                                print(f"{player1.name} got killed by the {player1.monster[player1.level]}!")
                                print(f"...........{player1.name}'s Journey ends here!.........")
                                return

                elif choice == "2":
                    print(f"{player1.name} ran away.")
                    exit_game = True
                    break

                elif choice == "3":
                    print(f"exiting the game.")
                    exit_game = True
                    break

        if exit_game:
            print(f"Thank you for playing the game {player1.name}! \nHope to meet you again!\n")
            break

if __name__ == "__main__":
    Isekai_Game()