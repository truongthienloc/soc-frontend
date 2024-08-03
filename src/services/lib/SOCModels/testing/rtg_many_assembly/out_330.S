.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x13 , 7
		auipc    x11 , 5
		auipc    x2 , 0
		auipc    x19 , 2
		lui      x5 , 9
		lui      x22 , 8
		lui      x27 , 6
		lui      x29 , 4
		sw       x16 , 0 (x13) 
		sw       x17 , 4 (x11) 
		sw       x14 , 8 (x2) 
		sw       x10 , 12 (x19) 
		sw       x1 , 16 (x5) 
		sw       x8 , 20 (x22) 
		sw       x6 , 24 (x27) 
		sw       x23 , 28 (x29) 
		lw       x28 , 28 (x29) 
		lw       x18 , 24 (x27) 
		lw       x12 , 20 (x22) 
		lw       x21 , 16 (x5) 
		lw       x20 , 12 (x19) 
		lw       x25 , 8 (x2) 
		lw       x30 , 4 (x11) 
		lw       x9 , 0 (x13) 
		bne      x9 , x16 , Fail
		bne      x30 , x17 , Fail
		bne      x25 , x14 , Fail
		bne      x20 , x10 , Fail
		bne      x21 , x1 , Fail
		bne      x12 , x8 , Fail
		bne      x18 , x6 , Fail
		bne      x28 , x23 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
