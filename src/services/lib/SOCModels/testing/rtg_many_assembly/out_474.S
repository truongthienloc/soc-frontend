.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x14 , x0 , 4 
		addi    x16 , x0 , 0 
		addi    x8 , x0 , 0 
		addi    x30 , x0 , 0 
InArr:
		addi    x3 , x0 , 24 
		addi    x24 , x0 , 32 
		addi    x6 , x0 , 48 
		addi    x22 , x0 , 52 
		sh      x3 , 32 (x30) 
		sh      x24 , 36 (x30) 
		sh      x6 , 40 (x30) 
		sh      x22 , 44 (x30) 
Loop:
		slli    x7 , x8 , 2 
		add     x27 , x7 , x30 
		lh      x4 , 32 (x27) 
		add     x16 , x16 , x4 
		addi    x8 , x8 , 1 
		beq     x8 , x14 , Result 
		jal     x0 , Loop 
Result:
		addi    x19 , x0 , 156 
		bne     x19 , x16 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
