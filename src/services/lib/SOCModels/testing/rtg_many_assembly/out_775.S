.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x16 , x0 , 4 
		add     x31 , x0 , x0 
		add     x18 , x0 , x0 
		addi    x2 , x0 , 8 
		addi    x27 , x0 , 2 
InArr:
		addi    x13 , x0 , 0 
		addi    x30 , x0 , 20 
		addi    x8 , x0 , 36 
		addi    x25 , x0 , 32 
		sh      x13 , 56 (x2) 
		sh      x30 , 60 (x2) 
		sh      x8 , 64 (x2) 
		sh      x25 , 68 (x2) 
Loop:
		sll     x19 , x18 , x27 
		add     x21 , x19 , x2 
		lhu     x22 , 56 (x21) 
		add     x31 , x31 , x22 
		addi    x18 , x18 , 1 
		beq     x18 , x16 , Result 
		jal     x0 , Loop 
Result:
		addi    x20 , x0 , 88 
		bne     x20 , x31 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
