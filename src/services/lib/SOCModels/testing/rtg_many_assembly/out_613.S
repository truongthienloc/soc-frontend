.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x29 , 0
		lui      x19 , 2
		lui      x30 , 5
		lui      x3 , 2
		lui      x31 , 5
		lui      x27 , 3
		lui      x23 , 3
		lui      x24 , 6
		sw       x25 , 48 (x29) 
		sw       x11 , 52 (x19) 
		sw       x4 , 56 (x30) 
		sw       x28 , 60 (x3) 
		sw       x5 , 64 (x31) 
		sw       x12 , 68 (x27) 
		sw       x7 , 72 (x23) 
		sw       x20 , 76 (x24) 
		lw       x6 , 76 (x24) 
		lw       x9 , 72 (x23) 
		lw       x10 , 68 (x27) 
		lw       x14 , 64 (x31) 
		lw       x8 , 60 (x3) 
		lw       x15 , 56 (x30) 
		lw       x16 , 52 (x19) 
		lw       x18 , 48 (x29) 
		bne      x18 , x25 , Fail
		bne      x16 , x11 , Fail
		bne      x15 , x4 , Fail
		bne      x8 , x28 , Fail
		bne      x14 , x5 , Fail
		bne      x10 , x12 , Fail
		bne      x9 , x7 , Fail
		bne      x6 , x20 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
