.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x12 , 3
		lui      x9 , 9
		lui      x5 , 5
		lui      x6 , 0
		lui      x23 , 2
		lui      x27 , 9
		lui      x29 , 6
		lui      x26 , 0
		sw       x4 , 40 (x12) 
		sw       x19 , 44 (x9) 
		sw       x2 , 48 (x5) 
		sw       x11 , 52 (x6) 
		sw       x3 , 56 (x23) 
		sw       x13 , 60 (x27) 
		sw       x30 , 64 (x29) 
		sw       x14 , 68 (x26) 
		lw       x15 , 68 (x26) 
		lw       x18 , 64 (x29) 
		lw       x16 , 60 (x27) 
		lw       x20 , 56 (x23) 
		lw       x10 , 52 (x6) 
		lw       x22 , 48 (x5) 
		lw       x7 , 44 (x9) 
		lw       x24 , 40 (x12) 
		bne      x24 , x4 , Fail
		bne      x7 , x19 , Fail
		bne      x22 , x2 , Fail
		bne      x10 , x11 , Fail
		bne      x20 , x3 , Fail
		bne      x16 , x13 , Fail
		bne      x18 , x30 , Fail
		bne      x15 , x14 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
