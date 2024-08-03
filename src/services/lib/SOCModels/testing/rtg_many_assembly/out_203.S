.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x11 , 9
		lui      x8 , 5
		lui      x17 , 8
		lui      x3 , 1
		lui      x5 , 0
		lui      x13 , 4
		lui      x23 , 4
		lui      x28 , 1
		sw       x21 , 24 (x11) 
		sw       x14 , 28 (x8) 
		sw       x25 , 32 (x17) 
		sw       x2 , 36 (x3) 
		sw       x18 , 40 (x5) 
		sw       x31 , 44 (x13) 
		sw       x6 , 48 (x23) 
		sw       x26 , 52 (x28) 
		lw       x29 , 52 (x28) 
		lw       x10 , 48 (x23) 
		lw       x22 , 44 (x13) 
		lw       x19 , 40 (x5) 
		lw       x16 , 36 (x3) 
		lw       x12 , 32 (x17) 
		lw       x4 , 28 (x8) 
		lw       x15 , 24 (x11) 
		bne      x15 , x21 , Fail
		bne      x4 , x14 , Fail
		bne      x12 , x25 , Fail
		bne      x16 , x2 , Fail
		bne      x19 , x18 , Fail
		bne      x22 , x31 , Fail
		bne      x10 , x6 , Fail
		bne      x29 , x26 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
