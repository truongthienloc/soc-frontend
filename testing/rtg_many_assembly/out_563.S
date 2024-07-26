.text

#The program checks the ALU instruction in R_type

Main:
		addi    x16 , x0 , 10 
		addi    x6 , x0 , -89 
		addi    x18 , x0 , 129 
		addi    x28 , x0 , 183 
		addi    x14 , x0 , 0 
		blt     x16 , x6 , Less_r 
		bge     x16 , x6 , Bigger_r 
Less_r:
		sub     x23 , x18 , x28 
		and     x19 , x18 , x28 
		slt     x19 , x19 , x23 
		srl     x19 , x19 , x14 
		addi    x5 , x0 , 75 
		bne     x19 , x5 , Fail 
Bigger_r:
		or      x23 , x18 , x28 
		xor     x19 , x18 , x28 
		sltu     x19 , x19 , x23 
		sra     x19 , x19 , x14 
		addi    x5 , x0 , 237 
		bne     x19 , x5 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
