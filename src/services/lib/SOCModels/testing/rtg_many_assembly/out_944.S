.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x2 , 6
		auipc    x19 , 5
		auipc    x30 , 1
		auipc    x26 , 4
		lui      x22 , 6
		lui      x16 , 5
		lui      x29 , 2
		lui      x18 , 0
		sw       x25 , 16 (x2) 
		sw       x12 , 20 (x19) 
		sw       x1 , 24 (x30) 
		sw       x28 , 28 (x26) 
		sw       x11 , 32 (x22) 
		sw       x8 , 36 (x16) 
		sw       x5 , 40 (x29) 
		sw       x10 , 44 (x18) 
		lw       x23 , 44 (x18) 
		lw       x27 , 40 (x29) 
		lw       x21 , 36 (x16) 
		lw       x17 , 32 (x22) 
		lw       x15 , 28 (x26) 
		lw       x6 , 24 (x30) 
		lw       x13 , 20 (x19) 
		lw       x7 , 16 (x2) 
		bne      x7 , x25 , Fail
		bne      x13 , x12 , Fail
		bne      x6 , x1 , Fail
		bne      x15 , x28 , Fail
		bne      x17 , x11 , Fail
		bne      x21 , x8 , Fail
		bne      x27 , x5 , Fail
		bne      x23 , x10 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
