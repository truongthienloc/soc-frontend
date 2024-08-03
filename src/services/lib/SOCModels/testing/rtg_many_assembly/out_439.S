.text

#The program checks the ALU instruction in I_type

Main:
		addi    x25 , x0 , 51 
		addi    x4 , x0 , 50 
		sltu    x17 , x25 , x4 
		bltu    x25 , x4 , Less_i 
		bgeu    x25 , x4 , Bigger_i 
Less_i:
		ori     x31 , x25 , 24 
		sub     x2 , x4 , x25 
		srai    x2 , x2 , 3 
		and     x2 , x2 , x0 
		addi    x30 , x0 , 0 
		beq     x2 , x30 , Pass 
Bigger_i:
		ori     x31 , x25 , 166 
		sub     x2 , x4 , x25 
		srai    x2 , x2 , 4 
		and     x2 , x2 , x0 
		addi    x30 , x0 , 0 
		beq     x2 , x30 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
