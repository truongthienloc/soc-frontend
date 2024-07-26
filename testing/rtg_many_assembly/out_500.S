.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x27 , 6
		lui      x11 , 4
		lui      x17 , 2
		lui      x23 , 3
		lui      x25 , 0
		lui      x3 , 7
		lui      x24 , 5
		lui      x31 , 3
		sw       x14 , 24 (x27) 
		sw       x5 , 28 (x11) 
		sw       x6 , 32 (x17) 
		sw       x20 , 36 (x23) 
		sw       x12 , 40 (x25) 
		sw       x29 , 44 (x3) 
		sw       x10 , 48 (x24) 
		sw       x18 , 52 (x31) 
		lw       x4 , 52 (x31) 
		lw       x30 , 48 (x24) 
		lw       x2 , 44 (x3) 
		lw       x26 , 40 (x25) 
		lw       x22 , 36 (x23) 
		lw       x8 , 32 (x17) 
		lw       x28 , 28 (x11) 
		lw       x19 , 24 (x27) 
		bne      x19 , x14 , Fail
		bne      x28 , x5 , Fail
		bne      x8 , x6 , Fail
		bne      x22 , x20 , Fail
		bne      x26 , x12 , Fail
		bne      x2 , x29 , Fail
		bne      x30 , x10 , Fail
		bne      x4 , x18 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
