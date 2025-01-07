.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x25 , 9
		lui      x5 , 4
		lui      x29 , 3
		lui      x13 , 0
		lui      x28 , 3
		lui      x17 , 1
		lui      x21 , 3
		lui      x16 , 6
		sw       x12 , 40 (x25) 
		sw       x18 , 44 (x5) 
		sw       x2 , 48 (x29) 
		sw       x22 , 52 (x13) 
		sw       x15 , 56 (x28) 
		sw       x26 , 60 (x17) 
		sw       x8 , 64 (x21) 
		sw       x20 , 68 (x16) 
		lw       x14 , 68 (x16) 
		lw       x31 , 64 (x21) 
		lw       x30 , 60 (x17) 
		lw       x10 , 56 (x28) 
		lw       x24 , 52 (x13) 
		lw       x19 , 48 (x29) 
		lw       x11 , 44 (x5) 
		lw       x3 , 40 (x25) 
		bne      x3 , x12 , Fail
		bne      x11 , x18 , Fail
		bne      x19 , x2 , Fail
		bne      x24 , x22 , Fail
		bne      x10 , x15 , Fail
		bne      x30 , x26 , Fail
		bne      x31 , x8 , Fail
		bne      x14 , x20 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
