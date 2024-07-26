.text

#The program checks the ALU instruction in I_type

Main:
		addi    x25 , x0 , 188 
		addi    x26 , x0 , -2048 
		slti    x29 , x25 , 493 
		bltu    x25 , x26 , Less_i 
		bgeu    x25 , x26 , Bigger_i 
Less_i:
		ori     x16 , x25 , 18 
		sub     x23 , x26 , x25 
		srai    x23 , x23 , 3 
		and     x23 , x23 , x0 
		addi    x5 , x0 , 0 
		beq     x23 , x5 , Pass 
Bigger_i:
		ori     x16 , x25 , 189 
		sub     x23 , x26 , x25 
		srai    x23 , x23 , 3 
		and     x23 , x23 , x0 
		addi    x5 , x0 , 0 
		beq     x23 , x5 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
