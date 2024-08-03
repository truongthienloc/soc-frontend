.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x7 , 8
		lui      x26 , 0
		lui      x2 , 0
		lui      x16 , 4
		lui      x13 , 8
		lui      x22 , 2
		lui      x3 , 1
		lui      x29 , 8
		sw       x18 , 28 (x7) 
		sw       x12 , 32 (x26) 
		sw       x11 , 36 (x2) 
		sw       x28 , 40 (x16) 
		sw       x4 , 44 (x13) 
		sw       x9 , 48 (x22) 
		sw       x24 , 52 (x3) 
		sw       x14 , 56 (x29) 
		lw       x21 , 56 (x29) 
		lw       x20 , 52 (x3) 
		lw       x25 , 48 (x22) 
		lw       x31 , 44 (x13) 
		lw       x6 , 40 (x16) 
		lw       x8 , 36 (x2) 
		lw       x27 , 32 (x26) 
		lw       x19 , 28 (x7) 
		bne      x19 , x18 , Fail
		bne      x27 , x12 , Fail
		bne      x8 , x11 , Fail
		bne      x6 , x28 , Fail
		bne      x31 , x4 , Fail
		bne      x25 , x9 , Fail
		bne      x20 , x24 , Fail
		bne      x21 , x14 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
