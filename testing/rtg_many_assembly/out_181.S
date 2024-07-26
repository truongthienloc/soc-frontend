.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x17 , x0 , 4 
		add     x9 , x0 , x0 
		add     x3 , x0 , x0 
		addi    x27 , x0 , 0 
InArr:
		addi    x25 , x0 , 40 
		addi    x4 , x0 , 48 
		addi    x10 , x0 , 52 
		addi    x22 , x0 , 64 
		sw      x25 , 36 (x27) 
		sw      x4 , 40 (x27) 
		sw      x10 , 44 (x27) 
		sw      x22 , 48 (x27) 
Loop:
		slli    x15 , x3 , 2 
		add     x16 , x15 , x27 
		lw      x29 , 36 (x16) 
		add     x9 , x9 , x29 
		addi    x3 , x3 , 1 
		beq     x3 , x17 , Result 
		jal     x0 , Loop
Result:
		addi    x12 , x0 , 204 
		bne     x12 , x9 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
