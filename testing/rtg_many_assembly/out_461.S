.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x4 , x0 , 4 
		addi    x12 , x0 , 0 
		addi    x11 , x0 , 0 
		addi    x16 , x0 , 8 
InArr:
		addi    x2 , x0 , 72 
		addi    x18 , x0 , 4 
		addi    x9 , x0 , 60 
		addi    x20 , x0 , 4 
		sh      x2 , 0 (x16) 
		sh      x18 , 4 (x16) 
		sh      x9 , 8 (x16) 
		sh      x20 , 12 (x16) 
Loop:
		slli    x14 , x11 , 2 
		add     x30 , x14 , x16 
		lh      x22 , 0 (x30) 
		add     x12 , x12 , x22 
		addi    x11 , x11 , 1 
		beq     x11 , x4 , Result 
		jal     x0 , Loop 
Result:
		addi    x7 , x0 , 140 
		bne     x7 , x12 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
