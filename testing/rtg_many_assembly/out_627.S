.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x1 , x0 , 4 
		add     x7 , x0 , x0 
		add     x27 , x0 , x0 
		addi    x2 , x0 , 8 
InArr:
		addi    x29 , x0 , 16 
		addi    x22 , x0 , 56 
		addi    x12 , x0 , 60 
		addi    x23 , x0 , 0 
		sb      x29 , 36 (x2) 
		sb      x22 , 40 (x2) 
		sb      x12 , 44 (x2) 
		sb      x23 , 48 (x2) 
Loop:
		slli    x24 , x27 , 2 
		add     x10 , x24 , x2 
		lb      x16 , 36 (x10) 
		add     x7 , x7 , x16 
		addi    x27 , x27 , 1 
		beq     x27 , x1 , Result 
		jal     x0 , Loop 
Result:
		addi    x25 , x0 , 132 
		bne     x25 , x7 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
