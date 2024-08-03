.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x4 , 7
		lui      x23 , 3
		lui      x5 , 4
		lui      x29 , 6
		lui      x18 , 0
		lui      x6 , 1
		lui      x8 , 0
		lui      x21 , 4
		sw       x13 , 48 (x4) 
		sw       x20 , 52 (x23) 
		sw       x7 , 56 (x5) 
		sw       x30 , 60 (x29) 
		sw       x17 , 64 (x18) 
		sw       x24 , 68 (x6) 
		sw       x19 , 72 (x8) 
		sw       x3 , 76 (x21) 
		lw       x2 , 76 (x21) 
		lw       x26 , 72 (x8) 
		lw       x14 , 68 (x6) 
		lw       x28 , 64 (x18) 
		lw       x11 , 60 (x29) 
		lw       x15 , 56 (x5) 
		lw       x16 , 52 (x23) 
		lw       x31 , 48 (x4) 
		bne      x31 , x13 , Fail
		bne      x16 , x20 , Fail
		bne      x15 , x7 , Fail
		bne      x11 , x30 , Fail
		bne      x28 , x17 , Fail
		bne      x14 , x24 , Fail
		bne      x26 , x19 , Fail
		bne      x2 , x3 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
