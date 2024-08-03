.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x17 , 4
		lui      x12 , 8
		lui      x28 , 5
		lui      x8 , 3
		lui      x25 , 7
		lui      x21 , 9
		lui      x31 , 8
		lui      x14 , 9
		sw       x29 , 4 (x17) 
		sw       x5 , 8 (x12) 
		sw       x7 , 12 (x28) 
		sw       x27 , 16 (x8) 
		sw       x9 , 20 (x25) 
		sw       x24 , 24 (x21) 
		sw       x13 , 28 (x31) 
		sw       x2 , 32 (x14) 
		lw       x16 , 32 (x14) 
		lw       x19 , 28 (x31) 
		lw       x23 , 24 (x21) 
		lw       x20 , 20 (x25) 
		lw       x11 , 16 (x8) 
		lw       x18 , 12 (x28) 
		lw       x30 , 8 (x12) 
		lw       x15 , 4 (x17) 
		bne      x15 , x29 , Fail
		bne      x30 , x5 , Fail
		bne      x18 , x7 , Fail
		bne      x11 , x27 , Fail
		bne      x20 , x9 , Fail
		bne      x23 , x24 , Fail
		bne      x19 , x13 , Fail
		bne      x16 , x2 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
