.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x7 , x0 , 4 
		add     x23 , x0 , x0 
		add     x3 , x0 , x0 
		addi    x10 , x0 , 12 
		addi    x24 , x0 , 2 
InArr:
		addi    x29 , x0 , 36 
		addi    x27 , x0 , 64 
		addi    x25 , x0 , 8 
		addi    x22 , x0 , 60 
		sb      x29 , 48 (x10) 
		sb      x27 , 52 (x10) 
		sb      x25 , 56 (x10) 
		sb      x22 , 60 (x10) 
Loop:
		sll     x16 , x3 , x24 
		add     x8 , x16 , x10 
		lbu     x13 , 48 (x8) 
		add     x23 , x23 , x13 
		addi    x3 , x3 , 1 
		beq     x3 , x7 , Result 
		jal     x0 , Loop 
Result:
		addi    x1 , x0 , 168 
		bne     x1 , x23 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
