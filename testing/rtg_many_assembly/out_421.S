.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x30 , 4
		lui      x5 , 3
		lui      x25 , 4
		lui      x16 , 8
		lui      x8 , 0
		lui      x2 , 0
		lui      x28 , 4
		lui      x11 , 0
		sw       x10 , 0 (x30) 
		sw       x18 , 4 (x5) 
		sw       x24 , 8 (x25) 
		sw       x6 , 12 (x16) 
		sw       x17 , 16 (x8) 
		sw       x12 , 20 (x2) 
		sw       x14 , 24 (x28) 
		sw       x21 , 28 (x11) 
		lw       x15 , 28 (x11) 
		lw       x13 , 24 (x28) 
		lw       x20 , 20 (x2) 
		lw       x26 , 16 (x8) 
		lw       x7 , 12 (x16) 
		lw       x29 , 8 (x25) 
		lw       x19 , 4 (x5) 
		lw       x4 , 0 (x30) 
		bne      x4 , x10 , Fail
		bne      x19 , x18 , Fail
		bne      x29 , x24 , Fail
		bne      x7 , x6 , Fail
		bne      x26 , x17 , Fail
		bne      x20 , x12 , Fail
		bne      x13 , x14 , Fail
		bne      x15 , x21 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
