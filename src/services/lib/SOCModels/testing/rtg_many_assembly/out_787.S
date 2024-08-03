.text

#The program checks the ALU instruction in I_type

Main:
		addi    x2 , x0 , 57 
		addi    x19 , x0 , 56 
		sltu    x26 , x2 , x19 
		bltu    x2 , x19 , Less_i 
		bgeu    x2 , x19 , Bigger_i 
Less_i:
		ori     x29 , x2 , 84 
		sub     x16 , x19 , x2 
		srai    x16 , x16 , 4 
		and     x16 , x16 , x0 
		addi    x24 , x0 , 0 
		beq     x16 , x24 , Pass 
Bigger_i:
		ori     x29 , x2 , 59 
		sub     x16 , x19 , x2 
		srai    x16 , x16 , 1 
		and     x16 , x16 , x0 
		addi    x24 , x0 , 0 
		beq     x16 , x24 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
