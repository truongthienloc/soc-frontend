.text

#The program checks the ALU instruction in R_type

Main:
		addi    x9 , x0 , 164 
		addi    x8 , x0 , 65 
		addi    x21 , x0 , 23 
		addi    x23 , x0 , 102 
		addi    x7 , x0 , 4 
		blt     x9 , x8 , Less_r 
		bge     x9 , x8 , Bigger_r 
Less_r:
		sub     x28 , x21 , x23 
		and     x5 , x21 , x23 
		slti    x5 , x5 , 41 
		srl     x5 , x5 , x7 
		addi    x1 , x0 , -5 
		bne     x5 , x1 , Fail 
Bigger_r:
		or      x28 , x21 , x23 
		xor     x5 , x21 , x23 
		sltiu   x5 , x5 , 173 
		sra     x5 , x5 , x7 
		addi    x1 , x0 , 14 
		bne     x5 , x1 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
