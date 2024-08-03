.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x26 , 9
		auipc    x28 , 6
		auipc    x7 , 8
		auipc    x5 , 2
		lui      x27 , 2
		lui      x4 , 2
		lui      x13 , 2
		lui      x18 , 8
		sw       x17 , 56 (x26) 
		sw       x31 , 60 (x28) 
		sw       x1 , 64 (x7) 
		sw       x24 , 68 (x5) 
		sw       x3 , 72 (x27) 
		sw       x16 , 76 (x4) 
		sw       x2 , 80 (x13) 
		sw       x23 , 84 (x18) 
		lw       x21 , 84 (x18) 
		lw       x20 , 80 (x13) 
		lw       x12 , 76 (x4) 
		lw       x22 , 72 (x27) 
		lw       x6 , 68 (x5) 
		lw       x19 , 64 (x7) 
		lw       x25 , 60 (x28) 
		lw       x15 , 56 (x26) 
		bne      x15 , x17 , Fail
		bne      x25 , x31 , Fail
		bne      x19 , x1 , Fail
		bne      x6 , x24 , Fail
		bne      x22 , x3 , Fail
		bne      x12 , x16 , Fail
		bne      x20 , x2 , Fail
		bne      x21 , x23 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
