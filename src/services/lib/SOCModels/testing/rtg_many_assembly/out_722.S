.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x28 , 8
		lui      x9 , 2
		lui      x6 , 0
		lui      x26 , 0
		lui      x5 , 0
		lui      x25 , 2
		lui      x16 , 9
		lui      x13 , 6
		sw       x29 , 8 (x28) 
		sw       x8 , 12 (x9) 
		sw       x30 , 16 (x6) 
		sw       x7 , 20 (x26) 
		sw       x12 , 24 (x5) 
		sw       x24 , 28 (x25) 
		sw       x14 , 32 (x16) 
		sw       x20 , 36 (x13) 
		lw       x3 , 36 (x13) 
		lw       x18 , 32 (x16) 
		lw       x22 , 28 (x25) 
		lw       x19 , 24 (x5) 
		lw       x2 , 20 (x26) 
		lw       x23 , 16 (x6) 
		lw       x27 , 12 (x9) 
		lw       x10 , 8 (x28) 
		bne      x10 , x29 , Fail
		bne      x27 , x8 , Fail
		bne      x23 , x30 , Fail
		bne      x2 , x7 , Fail
		bne      x19 , x12 , Fail
		bne      x22 , x24 , Fail
		bne      x18 , x14 , Fail
		bne      x3 , x20 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
