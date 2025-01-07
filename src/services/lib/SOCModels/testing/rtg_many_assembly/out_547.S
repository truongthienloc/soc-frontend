.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x4 , 2
		auipc    x19 , 5
		auipc    x25 , 5
		auipc    x2 , 1
		lui      x23 , 4
		lui      x13 , 7
		lui      x29 , 9
		lui      x10 , 7
		sw       x5 , 80 (x4) 
		sw       x15 , 84 (x19) 
		sw       x24 , 88 (x25) 
		sw       x18 , 92 (x2) 
		sw       x3 , 96 (x23) 
		sw       x9 , 100 (x13) 
		sw       x14 , 104 (x29) 
		sw       x20 , 108 (x10) 
		lw       x27 , 108 (x10) 
		lw       x7 , 104 (x29) 
		lw       x12 , 100 (x13) 
		lw       x31 , 96 (x23) 
		lw       x6 , 92 (x2) 
		lw       x26 , 88 (x25) 
		lw       x22 , 84 (x19) 
		lw       x1 , 80 (x4) 
		bne      x1 , x5 , Fail
		bne      x22 , x15 , Fail
		bne      x26 , x24 , Fail
		bne      x6 , x18 , Fail
		bne      x31 , x3 , Fail
		bne      x12 , x9 , Fail
		bne      x7 , x14 , Fail
		bne      x27 , x20 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
