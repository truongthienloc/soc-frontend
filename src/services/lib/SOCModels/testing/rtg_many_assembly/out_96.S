.text

#The program checks the ALU instruction in R_type

Main:
		addi    x18 , x0 , 192 
		addi    x21 , x0 , 93 
		addi    x1 , x0 , 148 
		addi    x2 , x0 , 195 
		addi    x9 , x0 , 1 
		blt     x18 , x21 , Less_r 
		bge     x18 , x21 , Bigger_r 
Less_r:
		sub     x14 , x1 , x2 
		and     x12 , x1 , x2 
		add     x12 , x12 , x14 
		srl     x12 , x12 , x9 
		addi    x19 , x0 , 40 
		bne     x12 , x19 , Fail 
Bigger_r:
		or      x14 , x1 , x2 
		xor     x12 , x1 , x2 
		add     x12 , x12 , x14 
		sra     x12 , x12 , x9 
		addi    x19 , x0 , 151 
		bne     x12 , x19 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
