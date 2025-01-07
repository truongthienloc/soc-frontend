.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x28 , x0 , 4 
		add     x9 , x0 , x0 
		add     x5 , x0 , x0 
		addi    x4 , x0 , 60 
		addi    x25 , x0 , 2 
InArr:
		addi    x6 , x0 , 36 
		addi    x12 , x0 , 8 
		addi    x16 , x0 , 16 
		addi    x19 , x0 , 20 
		sb      x6 , 4 (x4) 
		sb      x12 , 8 (x4) 
		sb      x16 , 12 (x4) 
		sb      x19 , 16 (x4) 
Loop:
		sll     x14 , x5 , x25 
		add     x7 , x14 , x4 
		lbu     x11 , 4 (x7) 
		add     x9 , x9 , x11 
		addi    x5 , x5 , 1 
		beq     x5 , x28 , Result 
		jal     x0 , Loop 
Result:
		addi    x22 , x0 , 80 
		bne     x22 , x9 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
