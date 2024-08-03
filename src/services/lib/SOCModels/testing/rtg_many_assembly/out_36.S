.text

#The program checks the ALU instruction in R_type

Main:
		addi    x26 , x0 , 99 
		addi    x21 , x0 , 0 
		addi    x1 , x0 , 173 
		addi    x25 , x0 , 119 
		addi    x19 , x0 , 2 
		blt     x26 , x21 , Less_r 
		bge     x26 , x21 , Bigger_r 
Less_r:
		sub     x10 , x1 , x25 
		and     x12 , x1 , x25 
		slt     x12 , x12 , x10 
		srl     x12 , x12 , x19 
		addi    x22 , x0 , 22 
		bne     x12 , x22 , Fail 
Bigger_r:
		or      x10 , x1 , x25 
		xor     x12 , x1 , x25 
		sltu     x12 , x12 , x10 
		sra     x12 , x12 , x19 
		addi    x22 , x0 , 118 
		bne     x12 , x22 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
