.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x30 , 6
		lui      x17 , 3
		lui      x18 , 6
		lui      x13 , 7
		lui      x7 , 0
		lui      x24 , 0
		lui      x8 , 8
		lui      x26 , 3
		sw       x31 , 32 (x30) 
		sw       x16 , 36 (x17) 
		sw       x4 , 40 (x18) 
		sw       x25 , 44 (x13) 
		sw       x20 , 48 (x7) 
		sw       x15 , 52 (x24) 
		sw       x3 , 56 (x8) 
		sw       x27 , 60 (x26) 
		lw       x14 , 60 (x26) 
		lw       x2 , 56 (x8) 
		lw       x23 , 52 (x24) 
		lw       x10 , 48 (x7) 
		lw       x11 , 44 (x13) 
		lw       x12 , 40 (x18) 
		lw       x6 , 36 (x17) 
		lw       x22 , 32 (x30) 
		bne      x22 , x31 , Fail
		bne      x6 , x16 , Fail
		bne      x12 , x4 , Fail
		bne      x11 , x25 , Fail
		bne      x10 , x20 , Fail
		bne      x23 , x15 , Fail
		bne      x2 , x3 , Fail
		bne      x14 , x27 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
